export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      archive_items: {
        Row: {
          content_type: string
          created_at: string
          description: string
          file_url: string | null
          id: string
          is_public: boolean
          tags: string[] | null
          title: string
          user_id: string
        }
        Insert: {
          content_type: string
          created_at?: string
          description: string
          file_url?: string | null
          id?: string
          is_public?: boolean
          tags?: string[] | null
          title: string
          user_id: string
        }
        Update: {
          content_type?: string
          created_at?: string
          description?: string
          file_url?: string | null
          id?: string
          is_public?: boolean
          tags?: string[] | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      community_members: {
        Row: {
          bio: string | null
          contribution_points: number
          id: string
          joined_at: string
          membership_type: string
          social_links: Json | null
          user_id: string
        }
        Insert: {
          bio?: string | null
          contribution_points?: number
          id?: string
          joined_at?: string
          membership_type: string
          social_links?: Json | null
          user_id: string
        }
        Update: {
          bio?: string | null
          contribution_points?: number
          id?: string
          joined_at?: string
          membership_type?: string
          social_links?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      event_participants: {
        Row: {
          event_id: string
          id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          event_id: string
          id?: string
          joined_at?: string
          user_id: string
        }
        Update: {
          event_id?: string
          id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_participants_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          current_participants: number
          description: string
          event_date: string
          id: string
          image_url: string | null
          is_featured: boolean
          is_online: boolean
          location: string | null
          max_participants: number | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_participants?: number
          description: string
          event_date: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          is_online?: boolean
          location?: string | null
          max_participants?: number | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_participants?: number
          description?: string
          event_date?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          is_online?: boolean
          location?: string | null
          max_participants?: number | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      forum_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          order_index: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          order_index?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          order_index?: number | null
        }
        Relationships: []
      }
      forum_posts: {
        Row: {
          content: string
          created_at: string
          id: string
          topic_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          topic_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          topic_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_posts_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "forum_topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_topics: {
        Row: {
          category_id: string
          content: string
          created_at: string
          id: string
          is_pinned: boolean | null
          title: string
          updated_at: string
          user_id: string
          view_count: number
        }
        Insert: {
          category_id: string
          content: string
          created_at?: string
          id?: string
          is_pinned?: boolean | null
          title: string
          updated_at?: string
          user_id: string
          view_count?: number
        }
        Update: {
          category_id?: string
          content?: string
          created_at?: string
          id?: string
          is_pinned?: boolean | null
          title?: string
          updated_at?: string
          user_id?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "forum_topics_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "forum_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_topics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_experiments: {
        Row: {
          contributors: number
          created_at: string
          description: string
          id: string
          locked: boolean
          progress: number
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          contributors?: number
          created_at?: string
          description: string
          id?: string
          locked?: boolean
          progress?: number
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          contributors?: number
          created_at?: string
          description?: string
          id?: string
          locked?: boolean
          progress?: number
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      memes: {
        Row: {
          comments: number
          created_at: string
          description: string | null
          id: string
          image_url: string
          is_ai_generated: boolean
          likes: number
          title: string
          user_id: string
        }
        Insert: {
          comments?: number
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          is_ai_generated?: boolean
          likes?: number
          title: string
          user_id: string
        }
        Update: {
          comments?: number
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          is_ai_generated?: boolean
          likes?: number
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      pixels_canvas: {
        Row: {
          created_at: string
          ends_at: string | null
          height: number
          id: string
          is_active: boolean
          title: string
          width: number
        }
        Insert: {
          created_at?: string
          ends_at?: string | null
          height: number
          id?: string
          is_active?: boolean
          title: string
          width: number
        }
        Update: {
          created_at?: string
          ends_at?: string | null
          height?: number
          id?: string
          is_active?: boolean
          title?: string
          width?: number
        }
        Relationships: []
      }
      pixels_data: {
        Row: {
          canvas_id: string
          color: string
          id: string
          placed_at: string
          user_id: string
          x: number
          y: number
        }
        Insert: {
          canvas_id: string
          color: string
          id?: string
          placed_at?: string
          user_id: string
          x: number
          y: number
        }
        Update: {
          canvas_id?: string
          color?: string
          id?: string
          placed_at?: string
          user_id?: string
          x?: number
          y?: number
        }
        Relationships: [
          {
            foreignKeyName: "pixels_data_canvas_id_fkey"
            columns: ["canvas_id"]
            isOneToOne: false
            referencedRelation: "pixels_canvas"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_meme_comments: {
        Args: { meme_id: string }
        Returns: undefined
      }
      increment_meme_likes: {
        Args: { meme_id: string }
        Returns: undefined
      }
      increment_topic_views: {
        Args: { topic_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
